"use client";
import { useRouter } from 'next/navigation';

export default function AboutPage() {
  const router = useRouter();
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 grid-pattern">
      <div className="z-10 w-full max-w-4xl items-center justify-center">
        <div className="bg-black p-8 rounded-lg border border-green-500 mt-4">
          <h3 className="pixel-font text-green-500 mb-6 text-center text-2xl">ABOUT</h3>
          <div className="text-white space-y-4">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. 
              Maecenas euismod, nisi vel ultricies luctus, nisl nisl aliquam nisl, eget 
              aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies luctus, nisl 
              nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
            </p>
            <p>
              Etiam aliquet risus mauris, vitae ultricies velit lobortis vitae. Nulla facilisi. 
              Nam sollicitudin efficitur dui nec sagittis. Sed vulputate, nunc ac iaculis dictum, 
              tellus est efficitur velit, id euismod odio nibh ac sapien.
            </p>
            <p>
              LayerZero is an omnichain interoperability protocol designed for lightweight 
              cross-chain communication. This interactive experience will teach you the basics 
              of omnichain technology, how LayerZero works, and why it's revolutionizing 
              blockchain connectivity.
            </p>
          </div>
          <div className="flex justify-center mt-6">
            <button 
              className="pixel-font text-yellow-300 hover:text-green-500 focus:outline-none"
              onClick={() => router.push('/')}
            >
              BACK TO MENU
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
