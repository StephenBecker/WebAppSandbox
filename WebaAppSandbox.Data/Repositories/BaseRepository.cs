using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using WebaAppSandbox.Data.Repositories.Interfaces;

namespace WebaAppSandbox.Data.Repositories
{
    internal class BaseRepository : IBaseRepository
    {
        #region IDisposable Support

        protected bool _disposed;
        private readonly SafeHandle _handle;

        /// <summary>
        /// Initializes a new instance of the <see cref="BaseRepository"/> class.
        /// </summary>
        public BaseRepository()
        {
            _handle = new SafeFileHandle(IntPtr.Zero, true);
        }

        /// <summary>
        /// Public implementation of Dispose pattern callable by consumers.
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        /// <summary>
        /// Protected implementation of Dispose pattern.
        /// </summary>
        /// <param name="disposing"></param>
        protected virtual void Dispose(bool disposing)
        {
            if (_disposed)
                return;
            if (disposing)
            {
                _handle.Dispose();
            }
            _disposed = true;
        }

        /// <summary>
        /// Saves any changes made to the database.
        /// </summary>
        /// <returns></returns>
        protected int SaveChanges()
        {
            try
            {
                return _db.SaveChanges();
            }
            catch (DbEntityValidationException e)
            {
                foreach (var error in e.EntityValidationErrors)
                {
                    foreach (var validerror in error.ValidationErrors)
                    {
                        Console.WriteLine(string.Format("- Property: \"{0}\", Error: \"{1}\"",
                            validerror.PropertyName, validerror.ErrorMessage));
                    }
                }
                throw;
            }
        }

        #endregion IDisposable Support
    }
}
