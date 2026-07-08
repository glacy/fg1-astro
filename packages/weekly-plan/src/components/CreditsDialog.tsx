import React from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Info } from 'lucide-react';
import { useTheme } from '@course-dashboard/shared';
import { creditsData } from '../data/credits';
import { CONFIG } from '../config/app';

export const CreditsDialog: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-small transition-colors ${isDarkMode
            ? 'hover:bg-white/5 text-slate-300 hover:text-white'
            : 'hover:bg-gray-100 text-slate-700 hover:text-slate-900'
            }`}
          aria-label="Ver créditos y atribuciones"
        >
          <Info className="w-4 h-4" aria-hidden="true" />
          <span>Créditos</span>
        </button>
      </DialogTrigger>
      <DialogContent
        className={`max-w-4xl max-h-[90vh] overflow-y-auto ${isDarkMode ? 'bg-[#0b0f19] border-white/10' : 'bg-white border-gray-200'
          }`}
      >
        <DialogHeader>
          <DialogTitle className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Créditos y Atribuciones
          </DialogTitle>
          <DialogDescription className={isDarkMode ? 'text-slate-300' : 'text-gray-600'}>
            Este proyecto utiliza las siguientes bibliotecas y recursos de código abierto bajo sus respectivas licencias.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {creditsData.map((category) => (
            <section key={category.category}>
              <h3
                className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}
              >
                {category.category}
              </h3>
              <div className="grid gap-3">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className={`p-4 rounded-lg border transition-colors ${isDarkMode
                      ? 'bg-white/5 border-white/10 hover:bg-white/10'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`font-semibold hover:underline ${isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}
                        >
                          {item.name}
                        </a>
                        <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                          {item.description}
                        </p>
                      </div>
                      <div
                        className={`inline-flex items-center self-start px-2 py-1 rounded text-xs font-medium shrink-0 ${isDarkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
                          }`}
                      >
                        {item.license}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div
          className={`mt-6 pt-6 border-t text-sm ${isDarkMode ? 'border-white/10 text-slate-400' : 'border-gray-200 text-gray-600'}`}
        >
          <p>
            Este proyecto es © 2026 Cátedra de {CONFIG.course.name} - {CONFIG.course.institution}.
          </p>
          <p className="mt-2">
            Los proyectos de código abierto mencionados anteriormente son propiedad de sus respectivos autores y se utilizan bajo sus licencias correspondientes.
          </p>
        </div>

        <DialogFooter className="mt-6 sm:justify-end">
          <DialogClose asChild>
            <button
              type="button"
              className={`w-full sm:w-auto px-4 py-2 rounded-lg font-medium transition-colors ${isDarkMode
                ? 'bg-white/10 hover:bg-white/20 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
            >
              Cerrar
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
