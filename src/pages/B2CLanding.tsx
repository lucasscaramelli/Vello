import { useNavigate } from 'react-router-dom';

export function B2CLanding() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-vello-bg flex flex-col">
      <header className="h-16 border-b border-vello-border flex items-center justify-between px-6">
        <div className="flex items-center gap-2 text-vello-text font-bold text-xl">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-vello-accent">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Vello
        </div>
        <button 
          onClick={() => navigate('/biz/login')}
          className="text-sm font-medium text-vello-accent hover:text-vello-accent-hover transition-colors"
        >
          É dono de arena? Conheça o Vello.biz
        </button>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-vello-text mb-6">
          A infraestrutura digital do esporte
        </h1>
        <p className="text-lg text-vello-muted max-w-2xl mb-10">
          Descubra e reserve quadras, aulas e experiências esportivas em um só lugar. (Ambiente B2C Simulado)
        </p>
        
        <div className="bg-vello-card border border-vello-border p-8 rounded-xl max-w-md w-full">
          <h2 className="text-xl font-semibold mb-4 text-vello-text">Acesso para Parceiros</h2>
          <p className="text-sm text-vello-muted mb-6">
            Se você é um gestor de arena, clube ou complexo esportivo, acesse a plataforma de gestão.
          </p>
          <button 
            onClick={() => navigate('/biz/login')}
            className="w-full py-3 px-4 bg-vello-accent text-vello-bg font-semibold rounded-lg hover:bg-vello-accent-hover transition-colors"
          >
            Acessar Painel do Parceiro
          </button>
        </div>
      </main>
    </div>
  );
}
