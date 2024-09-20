    // components/BudgetCalculator.tsx
    import React, { useState } from 'react';
    import '../styles/BudgetCalculator.css';

    interface BudgetCalculatorProps {
    monthlyIncome: number;
    setMonthlyIncome: React.Dispatch<React.SetStateAction<number>>;
    budget: Record<string, number>;
    setBudget: React.Dispatch<React.SetStateAction<Record<string, number>>>;
    }

    const BudgetCalculator: React.FC<BudgetCalculatorProps> = ({
    monthlyIncome,
    setMonthlyIncome,
    budget,
    setBudget,
    }) => {
    const [category, setCategory] = useState<string>('');
    const [amount, setAmount] = useState<string>('');

    const handleAddCategory = () => {
        if (category && amount) {
        setBudget({ ...budget, [category]: parseFloat(amount) });
        setCategory('');
        setAmount('');
        }
    };

    return (
        <div className="budget-calculator">
        <h1>Calculadora de Presupuesto</h1>
        <div className="income-input">
            <label htmlFor="monthly-income">Ingreso Mensual:</label>
            <input
            id="monthly-income"
            type="number"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(parseFloat(e.target.value))}
            />
        </div>
        <div className="category-input">
            <input
            type="text"
            placeholder="Categoría"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            />
            <input
            type="number"
            placeholder="Monto"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handleAddCategory}>Agregar Categoría</button>
        </div>
        <div className="budget-list">
            {Object.entries(budget).map(([cat, amt]) => (
            <div key={cat} className="budget-item">
                <span className="category">{cat}</span>
                <span className="amount">${amt.toFixed(2)}</span>
            </div>
            ))}
        </div>
        <div className="budget-chart">
            {Object.entries(budget).map(([cat, amt]) => (
            <div key={cat} className="budget-bar" style={{width: `${(amt / monthlyIncome) * 100}%`}}>
                <span className="category">{cat}</span>
                <span className="amount">${amt.toFixed(2)}</span>
            </div>
            ))}
        </div>
        </div>
    );
    };

    export default BudgetCalculator;