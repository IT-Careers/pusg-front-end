using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace PUSG.Web.Hubs
{
    public class HomeHub : Hub
    {
        public async Task SendMessage(string user, string messageContent)
        {
            await this.Clients.All.SendAsync("ReceiveMessage", user, messageContent);
        }

        public override async Task OnConnectedAsync()
        {
            await this.Clients.All.SendAsync("OnConnected", this.Context.ConnectionId);

            await base.OnConnectedAsync();
        }
    }
}
