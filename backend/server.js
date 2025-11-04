import http from 'http';
import { URL } from 'url';

import {
  analytics,
  courses,
  instructors,
  learners,
  lessons,
  liveSessions,
  payments
} from './data/database.js';
import { createWorkflow, listWorkflows } from './store/workflowStore.js';

const PORT = process.env.PORT || 3000;

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  if (!res.hasHeader('Content-Type')) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
  }
  res.end(JSON.stringify(payload));
}

function parseQuery(searchParams) {
  return Object.fromEntries(searchParams.entries());
}

function applyCourseFilters(dataset, filters) {
  const { level, category, tag, search } = filters;
  return dataset.filter((course) => {
    if (level && course.level !== level) {
      return false;
    }
    if (category && course.category !== category) {
      return false;
    }
    if (tag && !(course.tags ?? []).includes(tag)) {
      return false;
    }
    if (search) {
      const query = search.toLowerCase();
      return (
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query)
      );
    }
    return true;
  });
}

function addInstructor(course) {
  return {
    ...course,
    instructor: instructors.find((instructor) => instructor.id === course.instructorId) ?? null
  };
}

async function readJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString('utf8').trim();
  if (!raw) {
    return {};
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    const invalid = new Error('Invalid JSON payload');
    invalid.statusCode = 400;
    throw invalid;
  }
}

const server = http.createServer(async (req, res) => {
  const start = Date.now();
  const method = req.method ?? 'GET';
  const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`);
  const segments = url.pathname.split('/').filter(Boolean);

  setCorsHeaders(res);

  if (method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    console.log(`${method} ${url.pathname} -> ${res.statusCode} (${Date.now() - start}ms)`);
    return;
  }

  try {
    if (method === 'GET' && segments[0] === 'api' && segments[1] === 'health' && segments.length === 2) {
      sendJson(res, 200, {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
      });
      return;
    }

    if (method === 'GET' && segments[0] === 'api' && segments[1] === 'courses' && segments.length === 2) {
      const { page = '1', pageSize = '10', ...filters } = parseQuery(url.searchParams);
      const filtered = applyCourseFilters(courses, filters);
      const currentPage = Math.max(parseInt(page, 10) || 1, 1);
      const normalizedPageSize = Math.min(Math.max(parseInt(pageSize, 10) || 10, 1), 50);
      const startIndex = (currentPage - 1) * normalizedPageSize;
      const paginated = filtered.slice(startIndex, startIndex + normalizedPageSize).map(addInstructor);

      sendJson(res, 200, {
        data: paginated,
        meta: {
          total: filtered.length,
          page: currentPage,
          pageSize: normalizedPageSize,
          totalPages: Math.max(Math.ceil(filtered.length / normalizedPageSize), 1)
        }
      });
      return;
    }

    if (method === 'GET' && segments[0] === 'api' && segments[1] === 'courses' && segments.length === 3) {
      const courseId = decodeURIComponent(segments[2]);
      const course = courses.find((item) => item.id === courseId);
      if (!course) {
        sendJson(res, 404, { error: 'Course not found' });
        return;
      }

      const courseLessons = lessons
        .filter((lesson) => lesson.courseId === course.id)
        .sort((a, b) => a.sequence - b.sequence);

      sendJson(res, 200, {
        ...addInstructor(course),
        lessons: courseLessons
      });
      return;
    }

    if (method === 'GET' && segments[0] === 'api' && segments[1] === 'lessons' && segments.length === 2) {
      const { courseId, status } = parseQuery(url.searchParams);
      const filtered = lessons
        .filter((lesson) => {
          if (courseId && lesson.courseId !== courseId) {
            return false;
          }
          if (status && lesson.status !== status) {
            return false;
          }
          return true;
        })
        .sort((a, b) => a.sequence - b.sequence);

      sendJson(res, 200, { data: filtered });
      return;
    }

    if (method === 'GET' && segments[0] === 'api' && segments[1] === 'lessons' && segments.length === 3) {
      const lessonId = decodeURIComponent(segments[2]);
      const lesson = lessons.find((item) => item.id === lessonId);
      if (!lesson) {
        sendJson(res, 404, { error: 'Lesson not found' });
        return;
      }
      sendJson(res, 200, { lesson });
      return;
    }

    if (method === 'GET' && segments[0] === 'api' && segments[1] === 'users' && segments.length === 2) {
      const { role } = parseQuery(url.searchParams);
      const filtered = learners.filter((user) => {
        if (role && user.role !== role) {
          return false;
        }
        return true;
      });

      sendJson(res, 200, { users: filtered });
      return;
    }

    if (method === 'GET' && segments[0] === 'api' && segments[1] === 'users' && segments.length === 3) {
      const userId = decodeURIComponent(segments[2]);
      const user = learners.find((item) => item.id === userId);
      if (!user) {
        sendJson(res, 404, { error: 'User not found' });
        return;
      }
      sendJson(res, 200, { user });
      return;
    }

    if (method === 'GET' && segments[0] === 'api' && segments[1] === 'payments' && segments.length === 2) {
      const { status, userId } = parseQuery(url.searchParams);
      const filtered = payments.filter((payment) => {
        if (status && payment.status !== status) {
          return false;
        }
        if (userId && payment.userId !== userId) {
          return false;
        }
        return true;
      });

      sendJson(res, 200, { payments: filtered });
      return;
    }

    if (method === 'GET' && segments[0] === 'api' && segments[1] === 'analytics' && segments.length === 2) {
      sendJson(res, 200, { analytics });
      return;
    }

    if (method === 'GET' && segments[0] === 'api' && segments[1] === 'live-sessions' && segments.length === 2) {
      const { status, courseId } = parseQuery(url.searchParams);
      const filtered = liveSessions.filter((session) => {
        if (status && session.status !== status) {
          return false;
        }
        if (courseId && session.courseId !== courseId) {
          return false;
        }
        return true;
      });

      sendJson(res, 200, { liveSessions: filtered });
      return;
    }

    if (method === 'GET' && segments[0] === 'api' && segments[1] === 'workflows' && segments.length === 2) {
      sendJson(res, 200, { workflows: listWorkflows() });
      return;
    }

    if (method === 'POST' && segments[0] === 'api' && segments[1] === 'workflows' && segments.length === 2) {
      let payload;
      try {
        payload = await readJsonBody(req);
      } catch (error) {
        const statusCode = error.statusCode ?? 400;
        sendJson(res, statusCode, { error: error.message });
        return;
      }

      try {
        const workflow = createWorkflow(payload ?? {});
        sendJson(res, 201, { workflow });
      } catch (error) {
        sendJson(res, 400, { error: error.message });
      }
      return;
    }

    sendJson(res, 404, { error: 'Not Found' });
  } catch (error) {
    console.error(error);
    sendJson(res, error.statusCode ?? 500, { error: 'Internal Server Error' });
  } finally {
    const duration = Date.now() - start;
    console.log(`${method} ${url.pathname} -> ${res.statusCode} (${duration}ms)`);
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
