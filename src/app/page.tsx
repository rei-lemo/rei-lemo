import ExpertProfile from "@/components/ExpertProfile";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function Home() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Ask500Titans
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Connect with 500+ industry titans and subject matter experts
              across diverse fields for real-time Q&A, advice, and
              problem-solving.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-blue-600 text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-2">Expert Matching</h3>
                <p className="text-gray-600">
                  AI-powered matching connects you with the perfect expert for
                  your specific needs.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-green-600 text-4xl mb-4">💬</div>
                <h3 className="text-xl font-semibold mb-2">
                  Real-time Consultation
                </h3>
                <p className="text-gray-600">
                  Get instant answers through text, voice, or video
                  consultations with verified experts.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-purple-600 text-4xl mb-4">⭐</div>
                <div className="bg-white">
                  <ExpertProfile expertId="sample-expert-id" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
                <p className="text-gray-600">
                  All experts are verified and rated by our community for
                  guaranteed quality advice.
                </p>
              </div>
            </div>

            <div className="mt-12">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors mr-4">
                Find an Expert
              </button>
              <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg text-lg transition-colors">
                Become an Expert
              </button>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
