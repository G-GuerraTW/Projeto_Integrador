using System.ComponentModel;

namespace PDV.Domain.Enum
{
    public enum Categoria
    {
        [Description("Calçados")]
        Calcados = 1,
        Roupas = 2,
        [Description("Acessórios")]
        Acessorios = 3,
    }
}