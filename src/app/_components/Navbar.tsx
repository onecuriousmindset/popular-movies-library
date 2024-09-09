import React from "react";

const Navbar = () => {
   return (
      <nav className="h-16 border-b">
         <div className="container mx-auto px-3 xl:px-6 py-8 flex items-center justify-between h-full">
            <div className="text-2xl font-medium">
               <a href="/">Popular Movies</a>
            </div>
         </div>
      </nav>
   );
};

export default Navbar;
