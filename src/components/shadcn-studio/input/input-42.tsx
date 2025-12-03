import { MinusIcon, PlusIcon } from 'lucide-react'

import { Button, Group, Input, Label, NumberField } from 'react-aria-components'

const InputWithStackedButtonsDemo = () => {
  return (
    <NumberField defaultValue={1024} minValue={0} className='w-full max-w-xs space-y-2'>
      <Label className='flex items-center gap-2 text-sm leading-none font-medium select-none'>
        Input with stacked buttons
      </Label>
      <Group className='dark:bg-neutral-200/30 border-neutral-200 data-focus-within:border-neutral-950 data-focus-within:ring-neutral-950/50 data-focus-within:has-aria-invalid:ring-red-500/20 dark:data-focus-within:has-aria-invalid:ring-red-500/40 data-focus-within:has-aria-invalid:border-red-500 relative inline-flex h-9 w-full min-w-0 items-center overflow-hidden rounded-md border bg-transparent text-base whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50 data-focus-within:ring-[3px] md:text-sm dark:dark:bg-neutral-800/30 dark:border-neutral-800 dark:data-focus-within:border-neutral-300 dark:data-focus-within:ring-neutral-300/50 dark:data-focus-within:has-aria-invalid:ring-red-900/20 dark:dark:data-focus-within:has-aria-invalid:ring-red-900/40 dark:data-focus-within:has-aria-invalid:border-red-900'>
        <Input className='selection:bg-neutral-900 selection:text-neutral-50 w-full grow px-3 py-2 text-center tabular-nums outline-none dark:selection:bg-neutral-50 dark:selection:text-neutral-900' />
        <div className='flex h-[calc(100%+2px)] flex-col'>
          <Button
            slot='increment'
            className='border-neutral-200 bg-white text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950 -me-px flex h-1/2 w-6 flex-1 items-center justify-center border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50'
          >
            <PlusIcon className='size-3' />
            <span className='sr-only'>Increment</span>
          </Button>
          <Button
            slot='decrement'
            className='border-neutral-200 bg-white text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950 -me-px -mt-px flex h-1/2 w-6 flex-1 items-center justify-center border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50'
          >
            <MinusIcon className='size-3' />
            <span className='sr-only'>Decrement</span>
          </Button>
        </div>
      </Group>
      <p className='text-neutral-500 text-xs dark:text-neutral-400'>
        Built with{''}
        <a
          className='hover:text-neutral-950 underline dark:hover:text-neutral-50'
          href='https://react-spectrum.adobe.com/react-aria/NumberField.html'
          target='_blank'
          rel='noopener noreferrer'
        >
          React Aria
        </a>
      </p>
    </NumberField>
  )
}

export default InputWithStackedButtonsDemo
