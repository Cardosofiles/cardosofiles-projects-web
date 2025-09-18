import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function TableSkeleton() {
  return (
    <div className="space-y-4 py-5 lg:px-5">
      {/* Header skeleton */}
      <div className="mb-4 flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Table skeleton */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Skeleton className="h-4 w-16" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-20" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-32" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-16" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-20" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-24" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-16" />
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                {/* Nome */}
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>

                {/* CPF/CNPJ */}
                <TableCell>
                  <Skeleton className="h-4 w-28" />
                </TableCell>

                {/* Data de Nascimento */}
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>

                {/* Email */}
                <TableCell>
                  <Skeleton className="h-4 w-40" />
                </TableCell>

                {/* Celular */}
                <TableCell>
                  <Skeleton className="h-4 w-28" />
                </TableCell>

                {/* Endereços */}
                <TableCell>
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <Skeleton className="h-3 w-48" />
                      <Skeleton className="h-3 w-36" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                </TableCell>

                {/* Ações */}
                <TableCell>
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-8 rounded" />
                    <Skeleton className="h-8 w-8 rounded" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
