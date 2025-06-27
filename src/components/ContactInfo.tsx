
import { Card, CardContent } from '@/components/ui/card';

const ContactInfo = () => {
  return (
    <Card className="bg-gray-50 border-2 border-gray-200">
      <CardContent className="p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">Need Help?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-center">
          <div>
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Technical Support</h3>
            <p className="text-gray-600 text-sm sm:text-base">support@empoweru.edu</p>
            <p className="text-gray-600 text-sm sm:text-base">(555) 123-HELP</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Accessibility Services</h3>
            <p className="text-gray-600 text-sm sm:text-base">accessibility@empoweru.edu</p>
            <p className="text-gray-600 text-sm sm:text-base">(555) 123-ACCESS</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactInfo;
