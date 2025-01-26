import React, { useContext } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { HiOutlineSun, HiOutlineMoon, HiOutlineComputerDesktop } from 'react-icons/hi2'
import { useTheme } from 'next-themes'
import { useTranslation } from 'react-i18next'
import { LanguageContext } from '@/client/context/language'

const themes: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system']

export default function DayNightSwitch() {
  const lng = useContext<string>(LanguageContext)
  const { t } = useTranslation(lng)
  const { resolvedTheme, theme, setTheme } = useTheme()

  const handleSelect = (curr: 'light' | 'dark' | 'system') => {
    setTheme(curr)
  }

  const isActive = (value: 'light' | 'dark' | 'system') => {
    return theme === value ? 'bg-secondary' : ''
  }

  const getThemeIcon = (theme?: string) => {
    const iconProps = '!h-6 !w-6 text-black dark:text-white'
    switch (theme) {
      case 'light':
        return <HiOutlineSun className={iconProps} />
      case 'dark':
        return <HiOutlineMoon className={iconProps} />
      case 'system':
        return <HiOutlineComputerDesktop className={iconProps} />
      default:
        return null
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild data-testid='daynight-trigger'>
        <Button size='lg' variant='ghost' title={t('theme.title')} className='px-3'>
          {getThemeIcon(resolvedTheme)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {themes.map((curr) => (
          <DropdownMenuItem
            key={curr}
            className={`cursor-pointer ${isActive(curr)}`.trim()}
            onClick={() => handleSelect(curr)}
          >
            <div className='flex'>
              <div className='pr-2'>{getThemeIcon(curr)}</div>
              <span className='self-center'>{t(`theme.${curr}`)}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
