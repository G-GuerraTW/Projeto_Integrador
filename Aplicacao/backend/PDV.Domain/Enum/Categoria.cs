using System.ComponentModel;

namespace PDV.Domain.Enum
{
    public enum Categoria
    {
        [Description("Cal�ados")]
        Calcados = 1,
        Roupas = 2,
        [Description("Acess�rios")]
        Acessorios = 3,
    }
}