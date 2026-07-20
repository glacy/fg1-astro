import type { AstroIntegration } from 'astro'

const JS = `(function(){document.addEventListener('DOMContentLoaded',function(){var e=document.getElementById('__offline_banner'),t,i=navigator.onLine;if(e)return;e=document.createElement('div');e.id='__offline_banner';e.setAttribute('aria-live','polite');e.style.cssText='position:fixed;top:0;inset-inline:0;z-index:9999;padding:0.5rem 1rem;text-align:center;font-size:0.875rem;font-family:system-ui,-apple-system,sans-serif;transition:transform .3s ease,opacity .3s ease';document.body.prepend(e);var s=function(){var o=!navigator.onLine;clearTimeout(t);if(i&&!o){e.textContent='Conectado';e.style.background='#d4edda';e.style.color='#155724';e.style.borderBottom='1px solid #c3e6cb';e.style.transform='translateY(0)';e.style.opacity='1';t=setTimeout(function(){e.style.transform='translateY(-100%)'},2500)}else if(o){e.textContent='Sin conexi\u00f3n \u2014 algunos contenidos pueden no estar disponibles';e.style.background='#fef3cd';e.style.color='#856404';e.style.borderBottom='1px solid #f5c6cb';e.style.transform='translateY(0)';e.style.opacity='1';t=setTimeout(function(){e.style.opacity='0'},5000)}else{e.style.transform='translateY(-100%)'}i=o};window.addEventListener('online',s);window.addEventListener('offline',s);document.addEventListener('astro:after-swap',s);s()})})()`

export function offlineBanner(): AstroIntegration {
  return {
    name: 'offline-banner',
    hooks: {
      'astro:config:setup': ({ injectScript }) => {
        injectScript('head-inline', JS)
      },
    },
  }
}
