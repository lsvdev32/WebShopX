/**
 * Comoponente DataTable reutilizable, lo utilizamos para mostrar tablas de datos
 * ${data}: Datos a mostrar en la tabla
 *
 * Lo utilizamos para mostrar tablas de datos de forma dinámica y con funcionalidades como búsqueda, ordenación y paginación.
 * Se utiliza en diferentes partes de la aplicación para mostrar listas de usuarios, productos, ordenes, etc.
 */

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useState } from 'react'
import CardWrapper from './CardWrapper'

export default function DataTable ({ data, columns, filterColumn, placeholderInput }) {
  const [columnVisibility, setColumnVisibility] = useState({})
  const [columnFilters, setColumnFilters] = useState([])
  const [rowSelection, setRowSelection] = useState({})
  const [sorting, setSorting] = useState([])

  /**
   * Inicializa la tabla con los datos y columnas proporcionados.
   * Configura las funcionalidades de ordenación, filtrado, paginación y selección de filas.
   */
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  return (
    <CardWrapper className='w-full shadow-lg bg-card p-6'>
      <div className='flex items-center py-4'>
        <Input
          placeholder={`Buscar por ${placeholderInput}...`}
          value={table.getColumn(filterColumn)?.getFilterValue() ?? ''}
          onChange={(event) => table.getColumn(filterColumn)?.setFilterValue(event.target.value)}
          className='max-w-sm'
        />
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length
              ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>
                  ))
                )
              : (
                <TableRow>
                  <TableCell colSpan={columns.length} className='h-24 text-center'>
                    No hay resultados.
                  </TableCell>
                </TableRow>
                )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='flex-1 text-sm text-muted-foreground'>
          {table.getFilteredSelectedRowModel().rows.length} de {table.getFilteredRowModel().rows.length} fila(s)
          seleccionada(s).
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Siguiente
          </Button>
        </div>
      </div>
    </CardWrapper>
  )
}
