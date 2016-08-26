using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using WebAppSandbox.Core.Models;
using WebAppSandbox.Data.Context;
using WebAppSandbox.Data.Context.Interface;
using WebAppSandbox.Data.Repositories.Interfaces;

namespace WebAppSandbox.Data.Repositories
{
    public class ResturantRepository : IResturantRepository
    {
        protected bool _disposed;

        private readonly SafeHandle _handle;

        public ISandboxDbContext SbDbContext
        {
            get
            {
                if (_sbDbContext == null)
                {
                    _sbDbContext = new SandboxDbContext();
                }
                return _sbDbContext;
            }
            set { _sbDbContext = value; }
        }

        private ISandboxDbContext _sbDbContext { get; set; }

        /// <summary>
        /// Public implementation of Dispose pattern callable by consumers.
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public ICollection<Resturant> getResturants()
        {
            var list = SbDbContext.Resturants.ToList();
            return list;
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
    }
}
