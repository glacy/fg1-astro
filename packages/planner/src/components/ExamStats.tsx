import React from 'react';
import { Hourglass, Star } from 'lucide-react';
import clsx from 'clsx';

interface ExamStatsProps {
    /** Cantidad de exámenes futuros */
    upcoming: number;
    /** Cantidad de exámenes programados para la fecha actual */
    today: number;
}

const ExamStats: React.FC<ExamStatsProps> = ({ upcoming, today }) => {
    const StatCard: React.FC<{
        icon: React.ReactNode,
        value: number,
        label: string,
        colorClass: string
    }> = ({ icon, value, label, colorClass }) => (
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-3 sm:gap-4">
            <div className={clsx(
                "w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg sm:text-xl flex-shrink-0",
                colorClass
            )}>
                {icon}
            </div>
            <div>
                <p className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white">{value}</p>
                <p className="text-[10px] sm:text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">{label}</p>
            </div>
        </div>
    );

    return (
        <div className="flex flex-wrap sm:flex-nowrap lg:flex-wrap justify-end gap-4">
            <StatCard
                icon={<Hourglass size={24} aria-hidden="true" />}
                value={upcoming}
                label="Próximos"
                colorClass="bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400"
            />
            <StatCard
                icon={<Star size={24} aria-hidden="true" />}
                value={today}
                label="Para Hoy"
                colorClass="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
            />
        </div>
    );
};

export default ExamStats;
