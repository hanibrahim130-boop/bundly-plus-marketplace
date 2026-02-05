import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Package, Clock, CheckCircle2, AlertCircle } from "lucide-react";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      product: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-[#F8F8F8] pt-[140px] pb-20">
      <div className="container mx-auto max-w-[1200px] px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <div>
            <h1 className="text-[48px] font-semibold tracking-[-0.04em] text-black uppercase mb-2">
              My Dashboard
            </h1>
            <p className="text-[#666666] font-medium uppercase tracking-[2px] text-[12px]">
              Welcome back, {session.user.name || session.user.email}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-[32px] p-8 shadow-sm">
              <h3 className="text-[12px] font-bold uppercase tracking-[2px] text-[#666666] mb-6">Overview</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Package className="w-5 h-5" />
                    </div>
                    <span className="font-bold uppercase text-[12px]">Total Orders</span>
                  </div>
                  <span className="text-xl font-bold">{orders.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="font-bold uppercase text-[12px]">Active Subs</span>
                  </div>
                  <span className="text-xl font-bold">
                    {orders.filter(o => o.status === 'COMPLETED').length}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-black rounded-[32px] p-8 shadow-xl text-white">
              <h3 className="text-[12px] font-bold uppercase tracking-[2px] text-gray-400 mb-6">Need Help?</h3>
              <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                If you have any issues with your subscriptions, our Lebanese support team is here to help.
              </p>
              <a 
                href="https://wa.me/96170123456" 
                target="_blank"
                className="inline-block w-full text-center py-4 bg-primary rounded-2xl font-bold uppercase text-[12px] tracking-wider hover:bg-primary/90 transition-all"
              >
                Contact Support
              </a>
            </div>
          </div>

          {/* Orders Table */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[32px] p-8 shadow-sm h-full">
              <h3 className="text-[12px] font-bold uppercase tracking-[2px] text-[#666666] mb-8">Recent Orders</h3>
              
              {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#F8F8F8] flex items-center justify-center text-gray-300 mb-4">
                    <Package className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold uppercase text-[14px] mb-2">No orders yet</h4>
                  <p className="text-sm text-[#666666] mb-8">Start exploring our premium deals!</p>
                  <a href="/#subscriptions" className="px-8 py-4 bg-black text-white rounded-2xl font-bold uppercase text-[12px] tracking-wider">
                    Browse Marketplace
                  </a>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="group flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-2xl bg-[#F8F8F8] transition-all hover:bg-white hover:shadow-md border border-transparent hover:border-gray-100">
                      <div className="flex items-center gap-6 mb-4 md:mb-0">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-sm">
                          <Image src={order.product.image || ''} alt={order.product.name} fill className="object-cover" />
                        </div>
                        <div>
                          <h4 className="font-bold uppercase text-[14px] mb-1 group-hover:text-primary transition-colors">
                            {order.product.name}
                          </h4>
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-bold uppercase tracking-[1px] text-[#999999]">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-gray-300" />
                            <span className="text-[10px] font-bold uppercase tracking-[1px] text-[#999999]">
                              {order.paymentMethod}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between w-full md:w-auto gap-8">
                        <div className="text-right">
                          <div className="text-lg font-bold">${order.amount}</div>
                          <div className="text-[10px] font-bold text-[#999999] uppercase">Total paid</div>
                        </div>
                        
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm">
                          {order.status === 'COMPLETED' ? (
                            <CheckCircle2 className="w-3 h-3 text-green-500" />
                          ) : order.status === 'PENDING' ? (
                            <Clock className="w-3 h-3 text-orange-500" />
                          ) : (
                            <AlertCircle className="w-3 h-3 text-red-500" />
                          )}
                          <span className={`text-[10px] font-bold uppercase tracking-[1px] ${
                            order.status === 'COMPLETED' ? 'text-green-600' : 
                            order.status === 'PENDING' ? 'text-orange-600' : 'text-red-600'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
