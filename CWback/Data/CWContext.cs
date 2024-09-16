using CWback.Models;
using Microsoft.EntityFrameworkCore;

namespace CWback.Data;
    public class CWContext : DbContext
    {
        public CWContext (DbContextOptions<CWContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; } = default!;
    }