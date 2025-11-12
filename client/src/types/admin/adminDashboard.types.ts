



export interface AdminDashBoardStatsTypeResponse {
    message: string;
    data: {
        totalBookings: number;
        totalPayments: number;
        totalClients: number;
        totalRevenue: number;
    }
}