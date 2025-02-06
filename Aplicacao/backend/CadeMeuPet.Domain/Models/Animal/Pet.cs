using CadeMeuPet.Domain.Models.Locate;

namespace CadeMeuPet.Domain.Models.Animal
{
    public class Pet
    {
        public int ID { get; set; }
        public string Nome { get; set; }
        public string Pelagem { get; set; }
        public string Caracteristicas { get; set; }
        public string Comentario { get; set; }
        public ICollection<Localizacao> Localizacoes { get; set; } = new List<Localizacao>();
        public Especie Especie { get; set; }
    }
}