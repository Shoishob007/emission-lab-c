import { Leaf } from "lucide-react";

const FooterSection = () => {
  return (
    <>
      <footer className="bg-slate-900 text-white py-16">
        <div className="mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">EcoSphere</span>
              </div>
              <p className="text-slate-400 mb-4">
                Leading the global movement towards carbon neutrality with
                innovative technology.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary transition-colors">
                  <span className="text-xs">f</span>
                </div>
                <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary transition-colors">
                  <span className="text-xs">t</span>
                </div>
                <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary transition-colors">
                  <span className="text-xs">in</span>
                </div>
              </div>
            </div>

            {/* Solutions */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a
                    href="#calculator"
                    className="hover:text-primary transition-colors"
                  >
                    Carbon Calculator
                  </a>
                </li>
                <li>
                  <a
                    href="#solutions"
                    className="hover:text-primary transition-colors"
                  >
                    Reduction Plans
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    className="hover:text-primary transition-colors"
                  >
                    Offset Projects
                  </a>
                </li>
                <li>
                  <a
                    href="#api"
                    className="hover:text-primary transition-colors"
                  >
                    API Integration
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a
                    href="#about"
                    className="hover:text-primary transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    className="hover:text-primary transition-colors"
                  >
                    Our Projects
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Press
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a
                    href="#contact"
                    className="hover:text-primary transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-slate-400 text-sm mb-4 md:mb-0">
                © 2024 EcoSphere. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 text-sm text-slate-400">
                <a href="#" className="hover:text-primary transition-colors">
                  Sitemap
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  Cookie Policy
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  Legal
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterSection;
