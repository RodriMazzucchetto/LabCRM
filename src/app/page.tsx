export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">LabCRM</h1>
        <p className="text-gray-600 text-lg mb-8">Sistema de gestão de conversas WhatsApp</p>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">🚀 Deploy Funcionando!</h2>
          <p className="text-gray-600">Se você está vendo esta página, o deploy foi realizado com sucesso.</p>
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
            <p className="text-green-800 font-medium">✅ Next.js funcionando</p>
            <p className="text-green-800 font-medium">✅ Tailwind CSS carregado</p>
            <p className="text-green-800 font-medium">✅ Vercel deploy OK</p>
          </div>
        </div>
      </div>
    </div>
  )
}