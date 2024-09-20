import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import BudgetCalculator from './components/BudgetCalculator';
import SavingsProjection from './components/SavingsProjection';
import InvestmentSimulator from './components/InvestmentSimulator';
import './App.css';

const App: React.FC = () => {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(0);
  const [budget, setBudget] = useState<Record<string, number>>({});
  const [savings, setSavings] = useState<number>(0);
  const [investments, setInvestments] = useState<Record<string, number>>({});

  useEffect(() => {
    const storedInvestments = localStorage.getItem('investments');
    if (storedInvestments) {
      setInvestments(JSON.parse(storedInvestments));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('investments', JSON.stringify(investments));
  }, [investments]);

  return (
    <Router>
      <div className="app">
        <nav>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/budget">Presupuesto</Link></li>
            <li><Link to="/savings">Ahorros</Link></li>
            <li><Link to="/investments">Inversiones</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={
            <Dashboard
              monthlyIncome={monthlyIncome}
              budget={budget}
              savings={savings}
              investments={investments}
            />
          } />
          <Route path="/budget" element={
            <BudgetCalculator
              monthlyIncome={monthlyIncome}
              setMonthlyIncome={setMonthlyIncome}
              budget={budget}
              setBudget={setBudget}
            />
          } />
          <Route path="/savings" element={
            <SavingsProjection
              monthlyIncome={monthlyIncome}
              budget={budget}
              savings={savings}
              setSavings={setSavings}
            />
          } />
          <Route path="/investments" element={
            <InvestmentSimulator
              savings={savings}
              investments={investments}
              setInvestments={setInvestments}
            />
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;