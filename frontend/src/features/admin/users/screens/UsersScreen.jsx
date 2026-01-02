import AnimatedSection from '@/components/common/AnimatedSection'
import DataTable from '@/components/common/DataTable'
import { MessageBox } from '@/components/common/MessageBox'
import { Helmet } from 'react-helmet-async'
import UserEditModal from '../components/UserEditModal'
import UsersSkeleton from '../components/UsersSkeleton'
import { getUserTableColumns } from '../components/UserTableColumns'
import useUsers from '../hooks/useUsers'

export default function UsersScreen () {
  /**
   * Custom hook para manejar la lógica de usuarios.
   * Incluye la obtención de usuarios, manejo de errores, y acciones de edición y eliminación.
   * @returns {Object} Contiene los usuarios, estados de carga, error, y funciones para manejar acciones.
   */
  const {
    users,
    loading,
    error,
    loadingDelete,
    selectedUser,
    openModal,
    handleDeleteUser,
    handleEditUser,
    handleUpdateSuccess,
    handleToggleModal
  } = useUsers()

  /**
   * Genera las columnas para la tabla de usuarios.
   * Utiliza las funciones de edición y eliminación de usuarios.
   */
  const columns = getUserTableColumns({ handleEditUser, handleDeleteUser })

  return (
    <AnimatedSection className='w-full py-6'>
      <Helmet>
        <title>Administrar Usuarios | WebShopX</title>
      </Helmet>
      <header className='mb-6'>
        <h1 className='text-2xl font-semibold'>Administrar usuarios registrados</h1>
        <p className='text-sm text-muted-foreground'>
          Aquí puedes actualizar la información de los usuarios y eliminarlos si lo deseas.
        </p>
      </header>
      <UserEditModal
        open={openModal}
        selectedUser={selectedUser}
        onOpenChange={handleToggleModal}
        onSuccess={handleUpdateSuccess}
      />
      {loading || loadingDelete
        ? (
          /**
           * Muestra un esqueleto de carga mientras se obtienen los datos de los usuarios o se está eliminando uno.
           */
          <UsersSkeleton />
          )
        : error
          ? (
            /**
             * Muestra un mensaje de error si ocurre un problema al obtener los usuarios.
             */
            <MessageBox variant='danger'>{error}</MessageBox>
            )
          : (
            /**
             * Muestra la tabla de usuarios si no hay errores ni cargas pendientes.
             */
            <DataTable data={users} columns={columns} filterColumn='email' placeholderInput='correo' />
            )}
    </AnimatedSection>
  )
}
