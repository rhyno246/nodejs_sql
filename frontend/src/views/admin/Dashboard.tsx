import * as React from "react";
import Layout from "../../components/backend/Layout";
import { Editor } from "@tinymce/tinymce-react";
interface DashBoardProps {}

const DashBoard: React.FunctionComponent<DashBoardProps> = () => {
  const apiKey = "27gbkyb2d15yn0ajmprg2i7cshbo11i8socgaraxzle1gf4y";
  const editorRef = React.useRef(null);
  return (
    <Layout>
      <Editor
        apiKey={apiKey}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        plugins=" preview importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount  help charmap quickbars emoticons"
        init={{
          images_upload_url: "postAcceptor.php",
          height: 700,
          menubar: true,
          toolbar:
            "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </Layout>
  );
};

export default DashBoard;
