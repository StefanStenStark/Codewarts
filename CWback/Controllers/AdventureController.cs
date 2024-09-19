using CWback.Data;
using CWback.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace CWback.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AdventureController : ControllerBase
{
    private readonly CWContext _context;

    public AdventureController(CWContext context)
    {
        _context = context;
    }

    // GET: api/adventure
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Adventure>>> GetAdventures()
    {
        var adventures = await _context.Adventures.ToListAsync();
        return Ok(adventures);
    }
}