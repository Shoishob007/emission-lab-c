'use client';

import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const ComboBox = ({
  options,
  value,
  label,
  placeholder,
  searchPlaceholder,
  emptyText,
  onSelect,
  onSearch
}: {
  options: { value: string; label: string }[];
  value: string;
  label: string;
  placeholder: string;
  searchPlaceholder: string;
  emptyText: string;
  onSelect: (value: string) => void;
  onSearch?: (value: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (value.trim() !== '') {
      onSearch && onSearch(value);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-muted-foreground">
        {label}
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between overflow-hidden"
          >
            {value ? options.find((opt) => opt.value === value)?.label : placeholder}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full max-w-[400px] p-0">
          <Command>
            <CommandInput 
              placeholder={searchPlaceholder} 
              value={inputValue}
              onValueChange={handleInputChange}
            />
            <CommandList className="max-h-[200px] overflow-auto">
              {inputValue.trim() === '' ? (
                <CommandEmpty>Type to search airports...</CommandEmpty>
              ) : options.length > 0 ? (
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onSelect={() => {
                        onSelect(option.value);
                        setOpen(false);
                        setInputValue('');
                      }}
                    >
                      {option.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          value === option.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : (
                <CommandEmpty>{emptyText}</CommandEmpty>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
