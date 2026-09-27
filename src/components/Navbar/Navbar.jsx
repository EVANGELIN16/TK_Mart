import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Package, Heart, ShoppingCart } from 'lucide-react'

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/products', label: 'Products', icon: Package },
  { to: '/wishlist', label: 'Wishlist', icon: Heart },
  { to: '/cart', label: 'Cart', icon: ShoppingCart },
]

export default function Navbar({ cartCount = 0 }) {
  return (
<nav className="backdrop-blur-xl bg-white/30 border-b border-white/20 shadow-lg px-8 py-4 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
    <h1 className="text-2xl font-bold text-white drop-shadow-lg"> Tk Mart</h1>

      <div className="flex items-center gap-6 text-slate-700 font-medium">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `relative flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'text-indigo-600'
                  : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={17} strokeWidth={2} />
                <span>{label}</span>

                {label === 'Cart' && cartCount > 0 && (
                  <span className="ml-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-indigo-600 px-1 text-[10px] font-semibold text-white">
                    {cartCount}
                  </span>
                )}

                {isActive && (
                  <span className="absolute inset-x-3 -bottom-[13px] h-[2px] rounded-full bg-indigo-600" />
                )}
              </>            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}