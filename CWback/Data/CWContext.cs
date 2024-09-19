using CWback.Models;
using Microsoft.EntityFrameworkCore;

namespace CWback.Data;
public class CWContext : DbContext
{
    public CWContext(DbContextOptions<CWContext> options)
        : base(options)
    {
    }
    public DbSet<User> Users { get; set; } = default!;
    public DbSet<Adventure> Adventures { get; set; } = default!;

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<Adventure>().Navigation(x => x.Questions).AutoInclude();
        builder.Entity<Question>().Navigation(x => x.Options).AutoInclude();
    }
}