namespace CadeMeuPet.Domain.Models.Locate
{
    public class Localizacao
    {
        public int ID { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public DateTime RegisterDate { get; set; }
    }
}