using CWback.Data;
using CWback.Helpers;
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
    public async Task<ActionResult<IEnumerable<AdventureResponseDto>>> GetAdventures()
    {
        var adventureDtos = await _context.Adventures
            .Select(a => AdventureMapper.MapAdventureToAdventureResponseDto(a)).ToListAsync();

        return Ok(adventureDtos);
    }

    // GET: api/adventure/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<AdventureResponseDto>> GetAdventureById(int id)
    {
        var adventure = await _context.Adventures.FindAsync(id);
        if (adventure == null)
        {
            return NotFound();
        }

        var adventureResponseDto = AdventureMapper.MapAdventureToAdventureResponseDto(adventure);

        return Ok(adventureResponseDto);
    }

    // POST: api/adventure
    [HttpPost]
    public async Task<ActionResult<Adventure>> CreateAdventure([FromBody] AdventureRequestDto adventureRequestDto)
    {
        Adventure adventure;
        try
        {
            adventure = AdventureMapper.MapAdventureRequestDtoToAdventure(adventureRequestDto);
        }
        catch (ArgumentOutOfRangeException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (ArgumentNullException ex)
        {
            return BadRequest(ex.Message);
        }

        _context.Adventures.Add(adventure);
        await _context.SaveChangesAsync();

        var adventureResponseDto = AdventureMapper.MapAdventureToAdventureResponseDto(adventure);

        return CreatedAtAction(nameof(GetAdventureById), new { id = adventure.Id }, adventureResponseDto);
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