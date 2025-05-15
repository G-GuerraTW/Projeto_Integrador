using PDV.Domain.Identity;
using System;
using System.Collections.Generic;

namespace PDV.Domain.Entities
{
    public class VendaEntity
    {
        public int Id { get; set; }
        public DateTime Data { get; set; }
        public double Total { get; set; }
        public double ValorPago { get; set; }
        public string FormaPagamento { get; set; } = string.Empty;
        public double Troco { get; set; }
        public DateTime CriadoEm { get; set; }

        public IEnumerable<ItemVendaEntity> ItensVenda { get; set; } = new List<ItemVendaEntity>();

        public int UserId { get; set; }
        public User User { get; set; }
    }
}
