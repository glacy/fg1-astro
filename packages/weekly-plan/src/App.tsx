import { Sidebar } from './components/Sidebar';
import { WeekContent } from './components/WeekContent';
import { useTheme } from '@course-dashboard/shared';
import { useCourse, CourseProvider } from './contexts/CourseContext';
import './index.css';

const InnerApp = () => {
  const { isDarkMode } = useTheme();
  const { currentWeekId, setCurrentWeekId, maxCurrentWeek, totalWeeks, currentWeek } = useCourse();

  return (
    <div className={`flex flex-col h-full transition-colors duration-300 ${isDarkMode ? 'bg-[#0b0f19] text-slate-200' : 'bg-gray-50 text-slate-800'
      } selection:bg-blue-500/30`}>
      <main className="pt-4 px-4 sm:px-6 pb-4 flex flex-col lg:flex-row gap-4 lg:gap-8 w-full lg:max-w-[1400px] lg:mx-auto relative z-10 flex-1 overflow-auto">
        <aside className="w-auto lg:w-72 lg:flex-shrink-0 lg:sticky lg:top-4 lg:self-start z-40 relative min-w-0">
          <Sidebar
            currentWeek={currentWeekId}
            onSelectWeek={setCurrentWeekId}
            totalWeeks={totalWeeks}
            maxCurrentWeek={maxCurrentWeek}
          />
        </aside>

        <div className="flex-1">
          <WeekContent
            week={currentWeek}
            totalWeeks={totalWeeks}
            onNavigate={setCurrentWeekId}
            maxCurrentWeek={maxCurrentWeek}
          />
        </div>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <CourseProvider>
      <InnerApp />
    </CourseProvider>
  );
};

export default App;
