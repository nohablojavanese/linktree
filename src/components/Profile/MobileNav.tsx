import NavItem from "./NavItem";
import { navItems } from "./navItems";

const MobileNav: React.FC = () => (
  <nav className="fixed bottom-0 left-0 right-0 z-10 flex justify-around bg-white dark:bg-gray-900 border-t p-2 md:hidden">
    {navItems.map((item) => (
      <NavItem key={item.href} {...item} isExpanded={false} />
    ))}
  </nav>
);

export default MobileNav;
