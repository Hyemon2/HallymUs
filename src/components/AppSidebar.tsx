
import { Home, Map, Search, Settings, GraduationCap, MapPin, Sun, Moon } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar'
import { useTheme } from './ThemeProvider'

type MenuItem = {
  title: string
  icon: typeof Home
  id: string
}

const menuItems: MenuItem[] = [
  {
    title: '홈',
    icon: Home,
    id: 'home'
  },
  {
    title: '캠퍼스 맵',
    icon: Map,
    id: 'campus-map'
  },
  {
    title: '건물 찾기',
    icon: Search,
    id: 'building-search'
  },
  {
    title: '강의실 찾기',
    icon: GraduationCap,
    id: 'classroom-search'
  },
]

interface AppSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function AppSidebar({ activeSection, onSectionChange }: AppSidebarProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <Sidebar className="border-r border-hallym-navy/20 bg-gradient-to-b from-hallym-navy/10 to-hallym-blue/5">
      <SidebarHeader className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-hallym-blue to-hallym-teal rounded-lg flex items-center justify-center">
            <MapPin className="text-white w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-hallym-blue via-hallym-teal to-hallym-sky bg-clip-text text-transparent dark:text-white">
              HallymUs
            </h2>
            <p className="text-sm text-muted-foreground dark:text-gray-300">Campus Navigator</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-hallym-blue dark:text-white font-semibold">
            캠퍼스 네비게이션
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onSectionChange(item.id)}
                    className={`w-full transition-all duration-300 hover:bg-gradient-to-r hover:from-hallym-blue/20 hover:to-hallym-teal/20 dark:text-white dark:hover:text-white ${
                      activeSection === item.id 
                        ? 'bg-gradient-to-r from-hallym-blue/30 to-hallym-teal/30 text-hallym-blue dark:text-white border-l-4 border-hallym-blue' 
                        : ''
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium dark:text-white">다크 모드</span>
          <button
            onClick={toggleTheme}
            className={`
              relative inline-flex h-8 w-16 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent 
              transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
              focus-visible:ring-offset-2 focus-visible:ring-offset-background
              ${theme === 'dark' 
                ? 'bg-gradient-to-r from-hallym-navy to-hallym-blue' 
                : 'bg-gradient-to-r from-hallym-sky to-hallym-light'
              }
            `}
          >
            <span
              className={`
                pointer-events-none flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-lg ring-0 
                transition-transform duration-300
                ${theme === 'dark' ? 'translate-x-8' : 'translate-x-1'}
              `}
            >
              {theme === 'dark' ? (
                <Moon className="h-3 w-3 text-hallym-navy" />
              ) : (
                <Sun className="h-3 w-3 text-hallym-blue" />
              )}
            </span>
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
