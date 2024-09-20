    // components/SavingsProjection.tsx
    import React, { useState, useEffect } from 'react';
    import '../styles/SavingsProjection.css';

    interface SavingsProjectionProps {
    monthlyIncome: number;
    budget: Record<string, number>;
    savings: number;
    setSavings: React.Dispatch<React.SetStateAction<number>>;
    }

    const SavingsProjection: React.FC<SavingsProjectionProps> = ({
    monthlyIncome,
    budget,
    savings,
    setSavings,
    }) => {
    const [monthsToProject, setMonthsToProject] = useState<number>(12);
    const [projectedSavings, setProjectedSavings] = useState<number[]>([]);

    useEffect(() => {
        const totalExpenses = Object.values(budget).reduce((a, b) => a + b, 0);
        const monthlySavings = monthlyIncome - totalExpenses;
        setSavings(monthlySavings);

        const projectedSavings = Array.from({ length: monthsToProject }, (_, i) => monthlySavings * (i + 1));
        setProjectedSavings(projectedSavings);
    }, [monthlyIncome, budget, monthsToProject, setSavings]);

    return (
        <div className="savings-projection">
        <h1>Proyección de Ahorros</h1>
        <div className="projection-input">
            <label htmlFor="months-to-project">Meses a proyectar:</label>
            <input
            id="months-to-project"
            type="number"
            value={monthsToProject}
            onChange={(e) => setMonthsToProject(parseInt(e.target.value))}
            />
        </div>
        <div className="savings-chart">
            {projectedSavings.map((amount, index) => (
            <div
                key={index}
                className="savings-bar"
                style={{ height: `${(amount / (monthlyIncome * monthsToProject)) * 100}%` }}
            >
                <span className="month">{index + 1}</span>
                <span className="amount">${amount.toFixed(0)}</span>
            </div>
            ))}
        </div>
        {projectedSavings.length > 0 ? (
            <p className="total-savings">
            Ahorros proyectados en {monthsToProject} meses: ${projectedSavings[projectedSavings.length - 1].toFixed(2)}
            </p>
        ) : (
            <p className="total-savings">Ahorros proyectados: No hay datos disponibles</p>
        )}
        </div>
    );
    };

    export default SavingsProjection;
