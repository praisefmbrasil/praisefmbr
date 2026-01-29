import React from 'react';
import { FileText, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TermsOfUsePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-[#000] min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="bg-black text-white pt-24 pb-16 md:pt-32 md:pb-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-400 hover:text-white mb-8 text-[10px] font-medium uppercase tracking-[0.4em] group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>

          <div className="flex items-center space-x-4 mb-6">
            <FileText className="w-8 h-8 text-[#ff6600]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.5em] text-[#ff6600]">
              Terms of Use
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-medium uppercase tracking-tighter leading-none mb-6">
            Terms<br />of Use
          </h1>
          <p className="text-gray-400 uppercase tracking-widest text-xs">
            Last Updated: January 28, 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 font-normal leading-relaxed uppercase tracking-tight">

          {/* Section: Introduction */}
          <section className="mb-20">
            <h2 className="text-3xl font-medium uppercase tracking-tighter mb-8 dark:text-white border-b-2 border-black dark:border-white pb-4 inline-block">
              Introduction
            </h2>
            <p>
              Welcome to Praise FM USA. By accessing our website and services, you agree to comply with and be bound by these Terms of Use.
            </p>
          </section>

          {/* Section: Account & Usage */}
          <section className="mb-20">
            <h2 className="text-3xl font-medium uppercase tracking-tighter mb-8 dark:text-white border-b-2 border-black dark:border-white pb-4 inline-block">
              Account & Usage
            </h2>
            <p>
              Some features, such as creating a "My Sounds" library, require an account. You are responsible for maintaining the confidentiality of your login credentials and for all activities under your account.
            </p>
            <p>
              You may not use the website for any unlawful purposes or violate any applicable laws.
            </p>
          </section>

          {/* Section: Intellectual Property */}
          <section className="mb-20">
            <h2 className="text-3xl font-medium uppercase tracking-tighter mb-8 dark:text-white border-b-2 border-black dark:border-white pb-4 inline-block">
              Intellectual Property
            </h2>
            <p>
              All content on Praise FM USA, including audio, images, text, and logos, are protected by copyright and other intellectual property laws. You may not copy, modify, or distribute content without our express permission.
            </p>
          </section>

          {/* Section: Limitations of Liability */}
          <section className="mb-20">
            <h2 className="text-3xl font-medium uppercase tracking-tighter mb-8 dark:text-white border-b-2 border-black dark:border-white pb-4 inline-block">
              Limitations of Liability
            </h2>
            <p>
              Praise FM USA is not liable for any damages arising from your use of our website or services. All content is provided "as is" without warranties of any kind.
            </p>
          </section>

          {/* Section: Privacy & Cookies */}
          <section className="mb-20">
            <h2 className="text-3xl font-medium uppercase tracking-tighter mb-8 dark:text-white border-b-2 border-black dark:border-white pb-4 inline-block">
              Privacy & Cookies
            </h2>
            <p>
              We respect your privacy. Please review our Cookies Policy and Privacy Policy for information on how we handle your data.
            </p>
          </section>

          {/* Section: Enforcement */}
          <section className="mb-20">
            <h2 className="text-3xl font-medium uppercase tracking-tighter mb-8 dark:text-white border-b-2 border-black dark:border-white pb-4 inline-block">
              Enforcement
            </h2>
            <p>
              We reserve the right to suspend or terminate accounts that violate these Terms of Use or any applicable laws.
            </p>
          </section>

          {/* Note */}
          <div className="p-8 bg-[#ff6600]/10 border-2 border-[#ff6600] text-center">
            <p className="text-black dark:text-white text-sm font-bold uppercase tracking-widest">
              By using our website, you acknowledge that you have read and understood these Terms of Use.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TermsOfUsePage;
