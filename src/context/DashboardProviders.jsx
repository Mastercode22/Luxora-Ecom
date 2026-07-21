import { OrdersProvider } from "./OrdersContext";
import { NotificationProvider } from "./NotificationContext";
import { RewardProvider } from "./RewardContext";
import { RecentlyViewedProvider } from "./RecentlyViewedContext";
import { ReviewProvider } from "./ReviewContext";
import { PreferencesProvider } from "./PreferencesContext";

export function DashboardProviders({ children }) {
  return (
    <PreferencesProvider>
      <NotificationProvider>
        <OrdersProvider>
          <RewardProvider>
            <RecentlyViewedProvider>
              <ReviewProvider>
                {children}
              </ReviewProvider>
            </RecentlyViewedProvider>
          </RewardProvider>
        </OrdersProvider>
      </NotificationProvider>
    </PreferencesProvider>
  );
}
