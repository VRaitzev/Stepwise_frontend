import { Route, Routes, Navigate } from 'react-router-dom';
import { Intro } from './pages/Intro';
import { RegistrationPage } from './pages/RegistartionPage';
import { ChoosingCourse } from './pages/ChoosingСourse';
import { PhysicalPlan } from './pages/PhysicalPlan';
import { MentalPlan } from './pages/MentalPlan';
import { InterationWindow } from './pages/InteractionWindow'
import { SignIn } from './pages/SignIn'
import { PhysicalPlanSettings } from './pages/PhysicalPlanSettings'
import { MentalPlanSettings } from './pages/MentalPlanSettings'
import { SimpleLayout } from './components/SimpleLayout';
import { MainLayout } from './components/MainLayout';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Роут для главной страницы */}
        <Route path="/" element={<Navigate to="/initiation/intro" />} />
        <Route path="/initiation" element={<SimpleLayout />}>
          <Route path="intro"element={<Intro />} /> {/* отобразится при переходе на / */}
          <Route path="signIn" element={<SignIn/>} />
          <Route path="registartionPage" element={<RegistrationPage/>} />
          <Route path="choosingCourse" element={<ChoosingCourse/>} />
          <Route path="physicalPlan" element={<PhysicalPlan/>} />
          <Route path="mentalPlan" element={<MentalPlan />} />
        </Route>
        <Route path="/main" element={<MainLayout/>}>
          <Route path="interationWindow" element={<InterationWindow/>} /> 
          <Route path="PhysicalPlanSettings" element={<PhysicalPlanSettings/>} /> 
          <Route path="MentalPlanSettings" element={<MentalPlanSettings/>} /> 
        </Route>
      </Routes>
    </div>
  );
}

export default App;

