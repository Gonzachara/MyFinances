    // components/InvestmentSimulator.tsx
    import React, { useState } from 'react';
    import '../styles/InvestmentSimulator.css';

    interface InvestmentSimulatorProps {
    savings: number;
    investments: Record<string, number>;
    setInvestments: React.Dispatch<React.SetStateAction<Record<string, number>>>;
    }

    const InvestmentSimulator: React.FC<InvestmentSimulatorProps> = ({
    savings,
    investments,
    setInvestments,
    }) => {
    const [investmentName, setInvestmentName] = useState<string>('');
    const [investmentAmount, setInvestmentAmount] = useState<string>('');
    const [returnRate, setReturnRate] = useState<string>('');
    const [years, setYears] = useState<string>('1');

    const handleAddInvestment = () => {
        if (investmentName && investmentAmount && returnRate && years) {
        const amount = parseFloat(investmentAmount);
        const rate = parseFloat(returnRate) / 100;
        const period = parseInt(years);
        const projectedReturn = amount * Math.pow((1 + rate), period);
        setInvestments({ ...investments, [investmentName]: projectedReturn });
        setInvestmentName('');
        setInvestmentAmount('');
        setReturnRate('');
        setYears('1');
        }
    };

    return (
        <div className="investment-simulator">
        <h1>Simulador de Inversiones</h1>
        <div className="investment-form">
            <input
            type="text"
            placeholder="Nombre de la inversión"
            value={investmentName}
            onChange={(e) => setInvestmentName(e.target.value)}
            />
            <input
            type="number"
            placeholder="Monto a invertir"
            value={investmentAmount}
            onChange={(e) => setInvestmentAmount(e.target.value)}
            />
            <input
            type="number"
            placeholder="Tasa de retorno anual (%)"
            value={returnRate}
            onChange={(e) => setReturnRate(e.target.value)}
            />
            <input
            type="number"
            placeholder="Años"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            />
            <button onClick={handleAddInvestment}>Simular Inversión</button>
        </div>
        <div className="investments-list">
            {Object.entries(investments).map(([name, amount]) => (
            <div key={name} className="investment-item">
                <span className="name">{name}</span>
                <span className="amount">${amount.toFixed(2)}</span>
                <div className="investment-bar" style={{width: `${(amount / Math.max(...Object.values(investments))) * 100}%`}}></div>
            </div>
            ))}
        </div>
        </div>
    );
    };

    export default InvestmentSimulator;