
import { useState } from 'react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/AppSidebar'
import { HomeSection } from '@/components/HomeSection'
import { CampusMapSection } from '@/components/CampusMapSection'
import { BuildingSearchSection } from '@/components/BuildingSearchSection'
import { ClassroomSearchSection } from '@/components/ClassroomSearchSection'
import { ThemeProvider } from '@/components/ThemeProvider'

const Index = () => {
  const [activeSection, setActiveSection] = useState('home')

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <HomeSection onSectionChange={setActiveSection} />
      case 'campus-map':
        return <CampusMapSection />
      case 'building-search':
        return <BuildingSearchSection />
      case 'classroom-search':
        return <ClassroomSearchSection />
      default:
        return <HomeSection onSectionChange={setActiveSection} />
    }
  }

  return (
    <ThemeProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gradient-to-br from-background via-hallym-navy/5 to-hallym-blue/10 animate-gradient-shift bg-400% relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-hallym-navy/20 via-hallym-blue/10 to-hallym-teal/10 animate-gradient-shift bg-400%" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-hallym-sky/5 to-hallym-light/10" />
          
          <AppSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
          
          <main className="flex-1 relative z-10">
            <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b border-hallym-navy/20">
              <div className="flex items-center gap-4 p-4">
                <SidebarTrigger className="hover:bg-hallym-blue/10 transition-colors" />
              </div>
            </div>
            
            <div className="p-6">
              {renderSection()}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default Index
