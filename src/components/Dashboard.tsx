// components/Dashboard.tsx
import React from 'react';
import '../styles/Dashboard.css';

interface DashboardProps {
  monthlyIncome: number;
  budget: Record<string, number>;
  savings: number;
  investments: Record<string, number>;
}

const Dashboard: React.FC<DashboardProps> = ({ monthlyIncome, budget, savings, investments }) => {
  const totalExpenses = Object.values(budget).reduce((a, b) => a + b, 0);
  const totalInvestments = Object.values(investments).reduce((a, b) => a + b, 0);

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Panel de Control Financiero</h1>
      <div className="dashboard-summary">
        <div className="summary-card income">
          <h2>Ingreso Mensual</h2>
          <p className="amount">${monthlyIncome.toFixed(2)}</p>
        </div>
        <div className="summary-card expenses">
          <h2>Gastos Totales</h2>
          <p className="amount">${totalExpenses.toFixed(2)}</p>
        </div>
        <div className="summary-card savings">
          <h2>Ahorros</h2>
          <p className="amount">${savings.toFixed(2)}</p>
        </div>
        <div className="summary-card investments">
          <h2>Inversiones</h2>
          <p className="amount">${totalInvestments.toFixed(2)}</p>
        </div>
      </div>
      <div className="dashboard-chart">
        <h2>Distribución de Finanzas</h2>
        <div className="pie-chart">
          <div className="slice expenses" style={{transform: `rotate(0deg) skew(${(totalExpenses / monthlyIncome) * 360}deg)`}}></div>
          <div className="slice savings" style={{transform: `rotate(${(totalExpenses / monthlyIncome) * 360}deg) skew(${(savings / monthlyIncome) * 360}deg)`}}></div>
          <div className="slice investments" style={{transform: `rotate(${((totalExpenses + savings) / monthlyIncome) * 360}deg) skew(${(totalInvestments / monthlyIncome) * 360}deg)`}}></div>
        </div>
        <div className="chart-legend">
          <div className="legend-item"><span className="color-box expenses"></span>Gastos</div>
          <div className="legend-item"><span className="color-box savings"></span>Ahorros</div>
          <div className="legend-item"><span className="color-box investments"></span>Inversiones</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;