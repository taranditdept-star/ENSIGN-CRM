type Props = {
  params: Promise<{ id: string }>
}

export default async function SubsidiaryWorkspace({ params }: Props) {
  const { id } = await params

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col p-8">
      <h1 className="text-4xl font-bold text-slate-900 mb-4">Subsidiary Workspace</h1>
      <p className="text-slate-600">Managing data capture for subsidiary ID: {id}</p>
    </div>
  )
}
