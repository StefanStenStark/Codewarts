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

    // GET: api/adventure/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Adventure>> GetAdventureById(int id)
    {
        var adventure = await _context.Adventures.FindAsync(id);
        if (adventure == null)
        {
            return NotFound();
        }
        return Ok(adventure);
    }

    // DELETE: api/adventure/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAdventure(int id)
    {
        var adventure = await _context.Adventures.FindAsync(id);
        if (adventure == null)
        {
            return NotFound();
        }

        _context.Adventures.Remove(adventure);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}