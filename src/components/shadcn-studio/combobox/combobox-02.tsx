import { Fragment, useId, useState } from 'react'

import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const items = [
  {
    continent: 'Fruits',
    items: [{ value: 'Apples' }, { value: 'Bananas' }, { value: 'Cherries' }]
  },
  {
    continent: 'Vegetables',
    items: [{ value: 'Carrots' }, { value: 'Broccoli' }, { value: 'Spinach' }]
  },
  {
    continent: 'Beverages',
    items: [{ value: 'Tea' }, { value: 'Coffee' }, { value: 'Juice' }]
  }
]

const ComboboxOptionGroupDemo = () => {
  const id = useId()
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')

  return (
    <div className='w-full max-w-xs space-y-2'>
      <Label htmlFor={id}>Combobox option group</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='bg-white hover:bg-white border-neutral-200 w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px] dark:bg-neutral-950 dark:hover:bg-neutral-950 dark:border-neutral-800'
          >
            {value ? (
              <span className='flex min-w-0 items-center gap-2'>
                <span className='truncate'>{value}</span>
              </span>
            ) : (
              <span className='text-neutral-500 dark:text-neutral-400'>Select item</span>
            )}
            <ChevronsUpDownIcon size={16} className='text-neutral-500/80 shrink-0 dark:text-neutral-400/80' aria-hidden='true' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='border-neutral-200 w-full min-w-[var(--radix-popper-anchor-width)] p-0 dark:border-neutral-800' align='start'>
          <Command>
            <CommandInput placeholder='Search item...' />
            <CommandList>
              <CommandEmpty>No item found.</CommandEmpty>
              {items.map(group => (
                <Fragment key={group.continent}>
                  <CommandGroup heading={group.continent}>
                    {group.items.map(item => (
                      <CommandItem
                        key={item.value}
                        value={item.value}
                        onSelect={currentValue => {
                          setValue(currentValue)
                          setOpen(false)
                        }}
                      >
                        {item.value}
                        {value === item.value && <CheckIcon size={16} className='ml-auto' />}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Fragment>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default ComboboxOptionGroupDemo
