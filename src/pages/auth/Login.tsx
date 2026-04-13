import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, MOCK_USERS } from '../../store/authStore';

export function Login() {
  const [email, setEmail] = useState('owner@vello.biz');
  const [password, setPassword] = useState('123456');
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    // Mock login logic
    if (email && password) {
      login(email);
      navigate('/biz');
    }
  };

  return (
    <div className="min-h-screen bg-vello-bg flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center items-center gap-2 text-vello-accent font-bold text-3xl tracking-tight mb-2">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Vello.biz
        </div>
        <h2 className="mt-2 text-center text-xl font-medium text-vello-muted">
          Plataforma de gestão para parceiros esportivos
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-vello-card py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-vello-border">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-vello-text">
                Email comercial
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-vello-border rounded-md shadow-sm placeholder-vello-muted bg-vello-bg text-vello-text focus:outline-none focus:ring-vello-accent focus:border-vello-accent sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-vello-text">
                Senha
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-vello-border rounded-md shadow-sm placeholder-vello-muted bg-vello-bg text-vello-text focus:outline-none focus:ring-vello-accent focus:border-vello-accent sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-vello-accent focus:ring-vello-accent border-vello-border rounded bg-vello-bg"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-vello-muted">
                  Lembrar-me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-vello-accent hover:text-vello-accent-hover">
                  Esqueceu a senha?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-vello-bg bg-vello-accent hover:bg-vello-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vello-accent focus:ring-offset-vello-bg transition-colors"
              >
                Entrar
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-vello-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-vello-card text-vello-muted">
                  Contas de teste (Mock)
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {Object.keys(MOCK_USERS).map(mockEmail => (
                <button
                  key={mockEmail}
                  onClick={() => setEmail(mockEmail)}
                  className="w-full inline-flex justify-center py-2 px-4 border border-vello-border rounded-md shadow-sm bg-vello-bg text-xs font-medium text-vello-muted hover:bg-vello-border/50"
                >
                  {MOCK_USERS[mockEmail].role}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <p className="mt-8 text-center text-sm text-vello-muted">
          Não tem uma conta?{' '}
          <a href="#" className="font-medium text-vello-accent hover:text-vello-accent-hover">
            Criar conta de parceiro
          </a>
        </p>
      </div>
    </div>
  );
}
