import React, { useEffect } from 'react';

const MyViewer = () => {
  useEffect(() => {
    const options = {
      env: 'AutodeskProduction',
      accessToken: '<YOUR_APPLICATION_TOKEN>'
    };
    const documentId = 'urn:<YOUR_URN_ID>';
    
    Autodesk.Viewing.Initializer(options, function onInitialized(){
      Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
    });

    function onDocumentLoadSuccess(doc) {
      const viewables = Autodesk.Viewing.Document.getSubItemsWithProperties(doc.getRootItem(), {'type':'geometry'}, true);
      if (viewables.length === 0) {
        console.error('Document contains no viewables.');
        return;
      }

      const initialViewable = viewables[0];
      const svfUrl = doc.getViewablePath(initialViewable);
      const modelOptions = {
        sharedPropertyDbPath: doc.getPropertyDbPath()
      };

      const viewerDiv = document.getElementById('MyViewerDiv');
      const viewer = new Autodesk.Viewing.Private.GuiViewer3D(viewerDiv);
      viewer.start(svfUrl, modelOptions, onLoadModelSuccess, onLoadModelError);
    }

    function onDocumentLoadFailure(viewerErrorCode) {
      console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
    }

    function onLoadModelSuccess(model) {
      console.log('onLoadModelSuccess()!');
      console.log('Validate model loaded: ' + (viewer.model === model));
      console.log(model);
    }

    function onLoadModelError(viewerErrorCode) {
      console.error('onLoadModelError() - errorCode:' + viewerErrorCode);
    }
  }, []);

  return (
    <div id="MyViewerDiv" style={{ width: '100%', height: '100%', backgroundColor: '#F0F8FF' }}></div>
  );
};

export default MyViewer;