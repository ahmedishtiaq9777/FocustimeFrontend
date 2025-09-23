const ErrorLogModal = ({ filecontent, setisOpen }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-3/4 max-w-3xl rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Log Content</h3>

        {filecontent && (
          <div className="bg-gray-100 p-4 rounded-md max-h-96 overflow-y-auto text-sm space-y-2">
            <p>
              <b>Message:</b> {filecontent.message}
            </p>
            <p>
              <b>Status:</b> {filecontent.status}
            </p>
            <p>
              <b>Method:</b> {filecontent.method}
            </p>
            <p>
              <b>URL:</b> {filecontent.url}
            </p>

            <div>
              <b>Stack:</b>
              <pre className="whitespace-pre-wrap">{filecontent.stack}</pre>
            </div>

            <div>
              <b>Body:</b>
              <pre className="whitespace-pre-wrap">
                {JSON.stringify(filecontent.body, null, 2)}
              </pre>
            </div>
          </div>
        )}

        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setisOpen(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};
export default ErrorLogModal;
