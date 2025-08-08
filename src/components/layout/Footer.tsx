import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { BookOpen, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">LERA Academy</span>
            </div>
            <p className="text-gray-300 text-sm">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/ERAacademy" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com/ERAacademy" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/ERAacademy" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/company/ERAacademy" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">{t('footer.courses.title')}</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/courses?category=Speaking" className="text-gray-400 hover:text-white transition-colors duration-300">
                  {t('footer.courses.speaking')}
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Writing" className="text-gray-400 hover:text-white transition-colors duration-300">
                  {t('footer.courses.writing')}
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Grammar" className="text-gray-400 hover:text-white transition-colors duration-300">
                  {t('footer.courses.grammar')}
                </Link>
              </li>
              <li>
                <Link to="/courses?category=IELTS" className="text-gray-400 hover:text-white transition-colors duration-300">
                  {t('footer.courses.ielts')}
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Business" className="text-gray-400 hover:text-white transition-colors duration-300">
                  {t('footer.courses.business')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">{t('footer.about.title')}</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors duration-300">
                  {t('footer.about.aboutUs')}
                </Link>
              </li>
              <li>
                <Link to="/teachers" className="text-gray-400 hover:text-white transition-colors duration-300">
                  {t('footer.about.teachers')}
                </Link>
              </li>
              <li>
                <Link to="/methodology" className="text-gray-400 hover:text-white transition-colors duration-300">
                  {t('footer.about.methodology')}
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-gray-400 hover:text-white transition-colors duration-300">
                  {t('footer.about.testimonials')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-300">
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-gray-400 hover:text-white transition-colors duration-300">
                  {t('footer.about.admin')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">{t('footer.legal.title')}</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors duration-300">
                  {t('footer.legal.terms')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300">
                  {t('footer.legal.privacy')}
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors duration-300">
                  {t('footer.legal.cookies')}
                </Link>
              </li>
              <li>
                <Link to="/refund" className="text-gray-400 hover:text-white transition-colors duration-300">
                  {t('footer.legal.refund')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-gray-400 text-sm text-center">
            &copy; {new Date().getFullYear()} {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;