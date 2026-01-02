/**
 *  Envoltura reutilizable de diseño para las páginas de autenticación (iniciar sesión, registrarse, olvidar contraseña, restablecer contraseña)
 */
export function AuthLayout ({ children, mode }) {
  return (
    <div className='w-full flex items-center justify-center p-4'>
      <div className='w-full max-w-4xl bg-card rounded-sm shadow-lg overflow-hidden flex flex-col md:flex-row border border-border'>
        {mode === 'signin'
          ? (
            <>
              <div className='w-full md:w-1/2 p-8 lg:p-12 bg-card'>
                {children}
              </div>
              <div className='w-full md:w-1/2 bg-primary text-primary-foreground p-8 lg:p-12 flex flex-col items-center justify-center text-center'>
                <h2 className='text-3xl font-bold mb-4'>Hola, Bienvenido!</h2>
                <p className='opacity-90 mb-8'>
                  Si aún no tienes una cuenta, puedes registrarte.
                </p>
                <a
                  href='/signup'
                  className='border-2 border-primary-foreground text-primary-foreground px-10 py-2 rounded-sm hover:bg-primary-foreground hover:text-primary transition-colors font-medium'
                >
                  Registrarse
                </a>
              </div>
            </>
            )
          : mode === 'signup'
            ? (
              <>
                <div className='w-full md:w-1/2 bg-primary text-primary-foreground p-8 lg:p-12 flex flex-col items-center justify-center text-center'>
                  <h2 className='text-3xl font-bold mb-4'>Crea tu cuenta!</h2>
                  <p className='opacity-90 mb-8'>
                    Si ya tienes una cuenta, puedes iniciar sesión.
                  </p>
                  <a
                    href='/signin'
                    className='border-2 border-primary-foreground text-primary-foreground px-10 py-2 rounded-sm hover:bg-primary-foreground hover:text-primary transition-colors font-medium'
                  >
                    Iniciar sesión
                  </a>
                </div>
                <div className='w-full md:w-1/2 p-8 lg:p-12 bg-card'>
                  {children}
                </div>
              </>
              )
            : mode === 'forgot-password'
              ? (
                <>
                  <div className='w-full md:w-1/2 bg-primary text-primary-foreground p-8 lg:p-12 flex flex-col items-center justify-center text-center'>
                    <h2 className='text-3xl font-bold mb-4'>¿Olvidaste tu contraseña?</h2>
                    <p className='opacity-90 mb-8'>
                      No te preocupes, te enviaremos un correo electrónico para restablecerla.
                    </p>
                  </div>
                  <div className='w-full md:w-1/2 p-8 lg:p-12 bg-card'>
                    {children}
                  </div>
                </>
                )
              : (
                <>
                  <div className='w-full md:w-1/2 p-8 lg:p-12 bg-card'>
                    {children}
                  </div>
                  <div className='w-full md:w-1/2 bg-primary text-primary-foreground p-8 lg:p-12 flex flex-col items-center justify-center text-center'>
                    <h2 className='text-3xl font-bold mb-4'>Restablecer contraseña</h2>
                    <p className='opacity-90 mb-8'>
                      Aquí puedes restablecer tu contraseña.
                    </p>
                  </div>
                </>
                )}
      </div>
    </div>
  )
}
