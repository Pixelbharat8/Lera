import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    const { action, points, reason, badgeName } = await req.json()

    // Get the current user
    const {
      data: { user },
    } = await supabaseClient.auth.getUser()

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (profileError) {
      throw profileError
    }

    let result = {}

    switch (action) {
      case 'award_points':
        result = await awardPoints(supabaseClient, profile.id, points, reason)
        break
      case 'award_badge':
        result = await awardBadge(supabaseClient, profile.id, badgeName)
        break
      case 'update_streak':
        result = await updateStreak(supabaseClient, profile.id)
        break
      case 'get_leaderboard':
        result = await getLeaderboard(supabaseClient)
        break
      case 'get_user_stats':
        result = await getUserStats(supabaseClient, profile.id)
        break
      default:
        throw new Error('Invalid action')
    }

    return new Response(
      JSON.stringify(result),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

async function awardPoints(supabase: any, userId: string, points: number, reason: string) {
  // Get current gamification data
  const { data: currentData, error: getCurrentError } = await supabase
    .from('user_gamification')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (getCurrentError) {
    throw getCurrentError
  }

  const newTotalPoints = currentData.total_points + points
  const newLevel = Math.floor(newTotalPoints / 1000) + 1

  // Update gamification data
  const { data: updatedData, error: updateError } = await supabase
    .from('user_gamification')
    .update({
      total_points: newTotalPoints,
      current_level: newLevel,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userId)
    .select()
    .single()

  if (updateError) {
    throw updateError
  }

  // Check for level-up badges
  if (newLevel > currentData.current_level) {
    await checkLevelBadges(supabase, userId, newLevel)
    
    // Notify user of level up
    await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        title: 'Level Up!',
        message: `Congratulations! You've reached level ${newLevel}`,
        type: 'success'
      })
  }

  // Check for point-based badges
  await checkPointBadges(supabase, userId, newTotalPoints)

  // Log the points award
  await supabase
    .from('user_analytics')
    .insert({
      user_id: userId,
      event_type: 'points_awarded',
      event_data: {
        points,
        reason,
        new_total: newTotalPoints,
        new_level: newLevel
      }
    })

  return { 
    gamificationData: updatedData, 
    pointsAwarded: points,
    message: `Awarded ${points} points for ${reason}` 
  }
}

async function awardBadge(supabase: any, userId: string, badgeName: string) {
  // Get badge details
  const { data: badge, error: badgeError } = await supabase
    .from('badges')
    .select('*')
    .eq('name', badgeName)
    .single()

  if (badgeError) {
    throw badgeError
  }

  // Check if user already has this badge
  const { data: existingBadge } = await supabase
    .from('user_badges')
    .select('id')
    .eq('user_id', userId)
    .eq('badge_id', badge.id)
    .single()

  if (existingBadge) {
    return { message: 'Badge already earned' }
  }

  // Award the badge
  const { data: userBadge, error: awardError } = await supabase
    .from('user_badges')
    .insert({
      user_id: userId,
      badge_id: badge.id
    })
    .select()
    .single()

  if (awardError) {
    throw awardError
  }

  // Notify user
  await supabase
    .from('notifications')
    .insert({
      user_id: userId,
      title: 'New Badge Earned!',
      message: `You've earned the "${badge.name}" badge: ${badge.description}`,
      type: 'success'
    })

  return { 
    badge: userBadge, 
    message: `Badge "${badgeName}" awarded successfully` 
  }
}

async function updateStreak(supabase: any, userId: string) {
  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0]

  // Get current gamification data
  const { data: currentData, error: getCurrentError } = await supabase
    .from('user_gamification')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (getCurrentError) {
    throw getCurrentError
  }

  let newStreak = 1
  let newLongestStreak = currentData.longest_streak

  // Check if user was active yesterday
  if (currentData.last_activity_date === yesterday) {
    newStreak = currentData.current_streak + 1
  } else if (currentData.last_activity_date === today) {
    // Already updated today
    return { message: 'Streak already updated today' }
  }

  // Update longest streak if necessary
  if (newStreak > newLongestStreak) {
    newLongestStreak = newStreak
  }

  // Update gamification data
  const { data: updatedData, error: updateError } = await supabase
    .from('user_gamification')
    .update({
      current_streak: newStreak,
      longest_streak: newLongestStreak,
      last_activity_date: today,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userId)
    .select()
    .single()

  if (updateError) {
    throw updateError
  }

  // Check for streak badges
  await checkStreakBadges(supabase, userId, newStreak)

  return { 
    gamificationData: updatedData, 
    message: `Streak updated to ${newStreak} days` 
  }
}

async function checkLevelBadges(supabase: any, userId: string, level: number) {
  const levelBadges = [
    { level: 5, badge: 'Rising Star' },
    { level: 10, badge: 'Dedicated Learner' },
    { level: 20, badge: 'Expert Student' },
    { level: 50, badge: 'Master Learner' }
  ]

  for (const { level: requiredLevel, badge } of levelBadges) {
    if (level >= requiredLevel) {
      await awardBadge(supabase, userId, badge)
    }
  }
}

async function checkPointBadges(supabase: any, userId: string, totalPoints: number) {
  const pointBadges = [
    { points: 100, badge: 'First Steps' },
    { points: 500, badge: 'Point Collector' },
    { points: 1000, badge: 'Thousand Club' },
    { points: 5000, badge: 'Point Master' }
  ]

  for (const { points: requiredPoints, badge } of pointBadges) {
    if (totalPoints >= requiredPoints) {
      await awardBadge(supabase, userId, badge)
    }
  }
}

async function checkStreakBadges(supabase: any, userId: string, streak: number) {
  const streakBadges = [
    { streak: 3, badge: 'Getting Started' },
    { streak: 7, badge: 'Week Warrior' },
    { streak: 30, badge: 'Month Master' },
    { streak: 100, badge: 'Streak Legend' }
  ]

  for (const { streak: requiredStreak, badge } of streakBadges) {
    if (streak >= requiredStreak) {
      await awardBadge(supabase, userId, badge)
    }
  }
}

async function getLeaderboard(supabase: any) {
  const { data: leaderboard, error } = await supabase
    .from('user_gamification')
    .select(`
      *,
      user:profiles!user_id(
        full_name,
        avatar_url
      )
    `)
    .order('total_points', { ascending: false })
    .limit(50)

  if (error) {
    throw error
  }

  return { leaderboard }
}

async function getUserStats(supabase: any, userId: string) {
  // Get gamification data
  const { data: gamificationData, error: gamificationError } = await supabase
    .from('user_gamification')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (gamificationError) {
    throw gamificationError
  }

  // Get user badges
  const { data: badges, error: badgesError } = await supabase
    .from('user_badges')
    .select(`
      *,
      badge:badges(*)
    `)
    .eq('user_id', userId)
    .order('earned_at', { ascending: false })

  if (badgesError) {
    throw badgesError
  }

  // Get recent activities
  const { data: recentActivities, error: activitiesError } = await supabase
    .from('user_analytics')
    .select('*')
    .eq('user_id', userId)
    .eq('event_type', 'points_awarded')
    .order('created_at', { ascending: false })
    .limit(10)

  if (activitiesError) {
    throw activitiesError
  }

  return {
    gamificationData,
    badges,
    recentActivities
  }
}