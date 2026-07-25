// @ts-nocheck
import { useEffect, useState } from "react";
import Head from "next/head";
import AdminLayout from "@/components/AdminLayout";
import { Check, Trash2, MailOpen, Mail, AlertCircle } from "lucide-react";
import { apiGet, apiPut, apiDelete } from "@/utils/api";

export default function ContactEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });

  const fetchEnquiries = async () => {
    try {
      const data = await apiGet("/enquiries/contact");
      setEnquiries(data.enquiries || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await apiPut(`/enquiries/${id}/read`);
      setMessage({ type: "success", text: "Enquiry marked as read!" });
      fetchEnquiries();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      await apiDelete(`/enquiries/${id}`);
      setMessage({ type: "success", text: "Enquiry deleted successfully!" });
      fetchEnquiries();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  return (
    <AdminLayout>
      <Head>
        <title>Contact Enquiries | SRO Admin</title>
      </Head>

      <div className="space-y-8 font-sans">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contact Us Enquiries</h1>
          <p className="text-sm text-gray-650 mt-1">
            Form submissions received from the public Contact page.
          </p>
        </div>

        {message.text && (
          <div
            className={`p-4 rounded-lg flex items-start gap-3 border text-sm ${
              message.type === "success"
                ? "bg-[#00974A]/15 border-[#00974A]/20 text-[#00974A]"
                : "bg-red-500/15 border-red-500/20 text-red-400"
            }`}
          >
            {message.type === "success" ? (
              <Check className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        <div className="bg-white/40 border border-gray-200 rounded-xl p-6 shadow-md overflow-x-auto">
          {loading ? (
            <div className="space-y-4 animate-pulse">
              {[1, 2, 3].map((idx) => (
                <div key={idx} className="h-16 bg-white rounded-lg"></div>
              ))}
            </div>
          ) : enquiries.length === 0 ? (
            <p className="text-gray-500 text-sm">No contact enquiries received yet.</p>
          ) : (
            <table className="w-full text-left text-sm text-gray-700">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 uppercase text-xs">
                  <th className="py-3 px-4">Sender Info</th>
                  <th className="py-3 px-4">Message</th>
                  <th className="py-3 px-4">Submitted At</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {enquiries.map((enq) => (
                  <tr
                    key={enq._id}
                    className={`hover:bg-white/30 transition-all ${
                      enq.status === "unread" ? "bg-[#00974A]/5 font-semibold text-gray-900" : ""
                    }`}
                  >
                    <td className="py-4 px-4 space-y-1">
                      <div className="flex items-center gap-2">
                        {enq.status === "unread" ? (
                          <Mail className="w-4 h-4 text-[#00974A]" />
                        ) : (
                          <MailOpen className="w-4 h-4 text-gray-500" />
                        )}
                        <span>{enq.name}</span>
                      </div>
                      <div className="text-xs text-gray-650 font-normal">{enq.email}</div>
                      <div className="text-xs text-gray-500 font-normal">{enq.phone}</div>
                      {enq.address && (
                        <div className="text-xs text-gray-500 font-normal italic">
                          {enq.address}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4 max-w-sm">
                      <p className="text-gray-700 font-normal text-xs whitespace-pre-wrap leading-relaxed">
                        {enq.message}
                      </p>
                    </td>
                    <td className="py-4 px-4 font-mono text-xs text-gray-500">
                      {new Date(enq.createdAt).toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-right space-x-2">
                      {enq.status === "unread" && (
                        <button
                          onClick={() => handleMarkAsRead(enq._id)}
                          title="Mark as read"
                          className="p-2 bg-white border border-gray-200 text-gray-700 hover:text-[#00974A] hover:border-[#00974A]/20 rounded-md transition-all inline-flex"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(enq._id)}
                        title="Delete Enquiry"
                        className="p-2 bg-white border border-gray-200 text-slate-350 hover:text-red-400 hover:border-red-500/20 rounded-md transition-all inline-flex"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
